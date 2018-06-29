package com.jerry.repository;

import com.jerry.pojo.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

/**
 * @author long chen
 * @date 2018/2/2
 * @description
 */
public interface UserRepository extends JpaRepository<Users, String>, JpaSpecificationExecutor<Users> {

    Users findUsersByUsername(String username);

}
