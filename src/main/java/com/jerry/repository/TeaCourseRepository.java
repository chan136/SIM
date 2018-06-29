package com.jerry.repository;

import com.jerry.pojo.TeaCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * @author long chen
 * @date 2018/2/2
 * @description
 */
public interface TeaCourseRepository extends JpaRepository<TeaCourse, Integer>, JpaSpecificationExecutor<TeaCourse> {

    TeaCourse findTeaCourseByTeaNoAndCourseNo(String teaNo,String courseNo);

}
