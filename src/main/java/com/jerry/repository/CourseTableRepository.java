package com.jerry.repository;

import com.jerry.pojo.CourseTable;
import com.jerry.pojo.CourseTableInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * @author long chen
 * @date 2018/2/2
 * @description
 */
public interface CourseTableRepository extends JpaRepository<CourseTable, Integer>, JpaSpecificationExecutor<CourseTable> {

    @Query("select distinct new com.jerry.pojo.CourseTableInfo" +
            "(cou.schoolYear,cou.schoolTerm,s.stuNo,s.stuName,s.classNo,cou.courseNo,cou.courseName,cou.courseKind,cou.courseCredit,cou.courseWeek,tc.teaName,ct.courseTime,ct.coursePlace) " +
            "from Student s,Course cou,TeaCourse tc,CourseClass cc,CourseTable ct,StuCourse sc  " +
            "where (s.classNo = cc.classNo and cou.courseNo = tc.courseNo and cou.courseNo = ct.courseNo " +
            "and cou.courseNo = cc.courseNo and ct.classNo = s.classNo " +
            "and s.stuNo in(?1)) or " +
            "(cou.courseNo = tc.courseNo  " +
            "and tc.courseNo = ct.courseNo " +
            "and cou.courseNo = ct.courseNo  " +
            "and cou.courseNo = sc.courseNo " +
            "and ct.classNo = s.classNo " +
            "and sc.stuNo = s.stuNo " +
            "and sc.stuNo in(?1))")
    List<CourseTableInfo> findInDetail(List<String> stuNo);

    @Query("select new com.jerry.pojo.CourseTableInfo" +
            "(cou.schoolYear,cou.schoolTerm,s.stuNo,s.stuName,s.classNo,cou.courseNo,cou.courseName,cou.courseKind,cou.courseCredit,cou.courseWeek,tc.teaName,ct.courseTime,ct.coursePlace) " +
            "from Student s,Course cou,TeaCourse tc,CourseClass cc,CourseTable ct " +
            "where (s.classNo = cc.classNo and cou.courseNo = tc.courseNo and cou.courseNo = ct.courseNo  " +
            "and ct.classNo = s.classNo and cou.courseNo = cc.courseNo  " +
            "and s.stuNo in(?1))")
    List<CourseTableInfo> findInDetailNoStuCourse(List<String> stuNo);

    @Query("select distinct new com.jerry.pojo.CourseTableInfo" +
            "(cou.schoolYear,cou.schoolTerm,s.stuNo,s.stuName,s.classNo,cou.courseNo,cou.courseName,cou.courseKind,cou.courseCredit,cou.courseWeek,tc.teaName,ct.courseTime,ct.coursePlace) " +
            "from Student s,Course cou,TeaCourse tc,CourseClass cc,CourseTable ct,StuCourse sc  " +
            "where (s.classNo = cc.classNo and cou.courseNo = tc.courseNo and cou.courseNo = ct.courseNo " +
            "and cou.courseNo = cc.courseNo and ct.classNo = s.classNo " +
            "and s.stuNo = ?1 and cou.schoolYear = ?2 and cou.schoolTerm = ?3) or " +
            "(cou.courseNo = tc.courseNo  " +
            "and tc.courseNo = ct.courseNo " +
            "and cou.courseNo = ct.courseNo  " +
            "and cou.courseNo = sc.courseNo " +
            "and ct.classNo = s.classNo " +
            "and sc.stuNo = s.stuNo " +
            "and s.stuNo = ?1 and cou.schoolYear = ?2 and cou.schoolTerm = ?3)")
    List<CourseTableInfo> findPersonInDetail(String stuNo,String schoolYear,String schoolTerm);

    @Query("select distinct new com.jerry.pojo.CourseTableInfo" +
            "(cou.schoolYear,cou.schoolTerm,s.stuNo,s.stuName,s.classNo,cou.courseNo,cou.courseName,cou.courseKind,cou.courseCredit,cou.courseWeek,tc.teaName,ct.courseTime,ct.coursePlace) " +
            "from Student s,Course cou,TeaCourse tc,CourseClass cc,CourseTable ct  " +
            "where s.classNo = cc.classNo and cou.courseNo = tc.courseNo and cou.courseNo = ct.courseNo " +
            "and cou.courseNo = cc.courseNo and ct.classNo = s.classNo " +
            "and s.stuNo = ?1 and cou.schoolYear = ?2 and cou.schoolTerm = ?3 ")
    List<CourseTableInfo> findPersonInDetailNoStuCourse(String stuNo,String schoolYear,String schoolTerm);

}
