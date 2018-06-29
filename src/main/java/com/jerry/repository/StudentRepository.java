package com.jerry.repository;

import com.jerry.pojo.Student;
import com.jerry.pojo.StudentInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * @author long chen
 * @date 2018/2/2
 * @description
 */
public interface StudentRepository extends JpaRepository<Student, String>, JpaSpecificationExecutor<Student> {

    Student findStudentByStuNo(String StuNo);

    List<Student> findStudentsByClassNo(String classNo);

    @Query("select new com.jerry.pojo.StudentInfo" +
            "(s.stuNo, s.classNo, c.className,tc.teaName, c.major, c.personCount, c.college, s.stuPhoto, s.stuName, s.stuSex, s.stuBirthTime, s.stuProvince, s.stuNation, s.stuFace, s.stuStudyTime, s.stuSchoolTime, s.stuDormitory, s.stuPhone, s.stuEMail, s.stuPost, s.stuID, s.stuIsGraduate, s.stuGraduateDate, s.stuFatherName, s.stuFatherJob, s.stuFatherPhone, s.stuMotherName, s.stuMotherJob, s.stuMotherPhone) " +
            "from Student s,Class c,TeaClass tc " +
            "where s.classNo = c.classNo and c.classNo = tc.classNo and s.stuNo in (?1)")
/*    @Query(value = "select s.stu_No, s.class_No, c.class_Name, c.person_Count, c.major, c.college, s.stu_Photo, s.stu_Name, s.stu_Sex, s.stu_Birth_Time, s.stu_Province, s.stu_Nation, s.stu_Face, s.stu_Study_Time, s.stu_School_Time, s.stu_Dormitory, s.stu_Phone, s.stuEMail, s.stu_Post, s.stuID, s.stu_Is_Graduate, s.stu_Graduate_Date, s.stu_Father_Name, s.stu_Father_Job, s.stu_Father_Phone, s.stu_Mother_Name, s.stu_Mother_Job, s.stu_Mother_Phone " +
            "from Student s,Class c where s.class_No = c.class_No and stu_No in (?1)",nativeQuery = true)*/
    List<StudentInfo> findInDetail(List<String> list);

    @Modifying
    @Transactional
    @Query("delete from Student where stuNo = ?1")
    void deleteStudentByStuNo(String stuNo);

}
