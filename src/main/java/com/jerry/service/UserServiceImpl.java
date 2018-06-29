package com.jerry.service;

import com.jerry.pojo.Users;
import com.jerry.repository.UserRepository;
import com.jerry.security.JWTProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jerry.common.exception.UserException;

import static com.jerry.common.utils.Des.decrypt;
import static com.jerry.common.utils.Des.encrypt;

@Service
public class UserServiceImpl implements IUserService{

	@Autowired
	UserRepository UserRepository;

	@Autowired
	private JWTProvider jwtProvider;

	@Override
	public String login(Users users) throws UserException {
		Users account = findByUsername(users.getUsername());
		if (account != null) {
			if (account.getPassword().equals(encrypt(users.getPassword()))) {
				return jwtProvider.createToken(users);
			} else {
				throw new UserException("password is invalid");
			}
		} else {
			throw new UserException("username is invalid");
		}
	}

	@Override
	public Users findByUsername(String username) {
		return UserRepository.findUsersByUsername(username);
	}
	
}
