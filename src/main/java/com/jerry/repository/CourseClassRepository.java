package com.jerry.repository;

import com.jerry.pojo.CourseClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * @author long chen
 * @date 2018/2/2
 * @description
 */
public interface CourseClassRepository extends JpaRepository<CourseClass, Integer>, JpaSpecificationExecutor<CourseClass> {

    CourseClass findCourseClassByCourseNoAndClassNo(String courseNo,String classNo);

}
