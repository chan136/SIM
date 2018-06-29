package com.jerry.repository;

import com.jerry.pojo.Class;
import com.jerry.pojo.CourseClass;
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
public interface ClassRepository extends JpaRepository<Class, String>, JpaSpecificationExecutor<Class> {

    Class findClassByClassName(String className);

    Class findClassByClassNo(String classNo);

    @Modifying
    @Transactional
    @Query(value = "update Class set person_count = ?1 where class_no = ?2",nativeQuery = true)
    void updateClass(int count,String classNo);

}
