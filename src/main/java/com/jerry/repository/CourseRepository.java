package com.jerry.repository;

import com.jerry.pojo.Course;
import com.jerry.pojo.StudentInfoScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * @author long chen
 * @date 2018/2/2
 * @description
 */
public interface CourseRepository extends JpaRepository<Course, String>, JpaSpecificationExecutor<Course> {

    Course findCourseByCourseNo(String courseNo);

    Course findCourseByCourseName(String courseName);

    @Query("select new com.jerry.pojo.StudentInfoScore(s.stuNo,s.stuName,cl.college,cl.major,cl.className,c.schoolYear," +
            "c.schoolTerm,c.courseNo,c.courseName,c.courseKind,c.courseCredit," +
            "sc.courseScore,sc.reTestScore,sc.reStudyScore) " +
            "from Student s,Course c,Score sc,Class cl " +
            "where c.courseNo = sc.courseNo and s.classNo = cl.classNo " +
            "and s.stuNo = sc.stuNo " +
            "and s.stuNo = ?1 order by c.schoolYear,c.schoolTerm")
    List<StudentInfoScore> findStudentScore(String stuNo);
}
