package com.jerry.repository;

import com.jerry.pojo.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * @author long chen
 * @date 2018/2/2
 * @description
 */
public interface TeacherRepository extends JpaRepository<Teacher, String>, JpaSpecificationExecutor<Teacher> {

    Teacher findTeacherByTeaNo(String teaNo);

    Teacher findTeacherByTeaName(String teaName);

}
