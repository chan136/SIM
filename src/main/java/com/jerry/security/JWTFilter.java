package com.jerry.security;

import com.jerry.common.exception.UserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author long chen
 * @date 2018/2/2
 * @description
 */
@WebFilter(filterName = "loginFilter", urlPatterns = "/verify/*")
public class JWTFilter implements Filter {
    @Autowired
    private JWTProvider jwtProvider;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;
        String jwt = resolveToken(httpServletRequest);
        try {
            jwtProvider.validateToken(jwt);
            filterChain.doFilter(servletRequest, servletResponse);
        } catch (UserException e) {
            e.printStackTrace();
            httpServletResponse.sendError(401, e.getMessage());
        }
    }

    @Override
    public void destroy() {

    }

    public String resolveToken(HttpServletRequest httpServletRequest) {
        String bearerToken = httpServletRequest.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }
}
