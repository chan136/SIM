package com.jerry.repository;

import com.jerry.pojo.Class;
import com.jerry.pojo.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author long chen
 * @date 2018/2/2
 * @description
 */
public interface StatusRepository extends JpaRepository<Status, String>{

    Status findStatusByName(String name);

}
