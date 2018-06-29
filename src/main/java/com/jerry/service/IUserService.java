package com.jerry.service;

import com.jerry.common.exception.UserException;
import com.jerry.pojo.Users;

public interface IUserService {

	String login(Users users) throws UserException;

	Users findByUsername(String username);
	
}
