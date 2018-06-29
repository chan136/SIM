package com.jerry.repository;

import com.jerry.pojo.CourseChoose;
import com.jerry.pojo.StuCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * @author long chen
 * @date 2018/2/2
 * @description
 */
public interface StuCourseRepository extends JpaRepository<StuCourse, Integer> {

    StuCourse findStuCourseByStuNoAndCourseNo(String stuNo,String courseNo);

    List<StuCourse> findStuCoursesByCourseNo(String courseNo);

    @Query("select new com.jerry.pojo.CourseChoose" +
            "(c.courseNo,c.courseName,c.courseKind,c.count,tc.teaName,c.courseCredit,c.courseWeek,ct.courseTime,ct.coursePlace) " +
            "from Course c,TeaCourse tc,CourseTable ct,StuCourse sc,Student s  " +
            "where c.courseNo = tc.courseNo and c.courseNo = ct.courseNo and sc.courseNo = c.courseNo and s.classNo = ct.classNo  " +
            "and sc.stuNo = s.stuNo  " +
            "and s.stuNo = ?1 and c.schoolYear = ?2 and c.schoolTerm = ?3  " +
            "and c.courseNo not in (select courseNo from CourseClass )")
    List<CourseChoose> findInDetail(String stuNo,String year,String term);

    @Query("select new com.jerry.pojo.CourseChoose" +
            "(c.courseNo,c.courseName,c.courseKind,c.count,tc.teaName,c.courseCredit,c.courseWeek,ct.courseTime,ct.coursePlace) " +
            "from Course c,TeaCourse tc,CourseTable ct,Student s " +
            "where c.courseNo = tc.courseNo and c.courseNo = ct.courseNo and s.classNo = ct.classNo " +
            "and s.stuNo = ?1 and c.schoolYear = ?2 and c.schoolTerm = ?3 ")
    List<CourseChoose> findInDetailCanChoose(String stuNo,String year,String term);

}
