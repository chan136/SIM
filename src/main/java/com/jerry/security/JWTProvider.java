package com.jerry.security;

import com.jerry.common.exception.UserException;
import com.jerry.pojo.Users;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.util.Date;

/**
 * @author long chen
 * @date 2018/2/2
 * @description
 */
@Configuration
public class JWTProvider {
    private final Logger log = LoggerFactory.getLogger(JWTProvider.class);
    @Value("${jwt.secret}")
    private String secretKey;
    @Value("${jwt.token-validity-in-seconds}")
    private long tokenValidityInMilliseconds;
    @Value("${jwt.token-validity-in-seconds-for-remember-me}")
    private long tokenValidityInMillisecondsForRememberMe;

    /**
     * create token
     */
    public String createToken(Users users) {
        long now = (new Date()).getTime();
        Date validity;
        validity = new Date(now + this.tokenValidityInMilliseconds);
        return Jwts.builder()
                .claim("username", users.getUsername())
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    /**
     * 从token中取出用户
     */
    public String parse(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
        return claims.get("username", String.class).toString();
    }

    /**
     * validate token
     *
     * @param authToken
     * @return
     */
    public boolean validateToken(String authToken) throws UserException {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            log.info("Invalid JWT signature.");
            log.trace("Invalid JWT signature trace: {}", e);
            throw new UserException("Invalid JWT signature.");
        } catch (MalformedJwtException e) {
            log.info("Invalid JWT token.");
            log.trace("Invalid JWT token trace: {}", e);
            throw new UserException("Invalid JWT token.");
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT token.");
            log.trace("Expired JWT token trace: {}", e);
            throw new UserException("Expired JWT token.");
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT token.");
            log.trace("Unsupported JWT token trace: {}", e);
            throw new UserException("Unsupported JWT token.");
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            log.info("JWT token compact of handler are invalid.");
            log.trace("JWT token compact of handler are invalid trace: {}", e);
            throw new UserException("JWT token compact of handler are invalid.");
        }
    }
}
