package com.jerry.pojo;

import lombok.Data;

import java.io.Serializable;

/**
 * @author long chen
 * @date 2018/4/9
 * @description
 */
@Data
public class StudentInfo implements Serializable{

    private static final long serialVersionUID = -7790740146551462837L;
    private String stuNo;//学号
    private String classNo;//班级编号
    private String className;//班级名称
    private String teaName;//班级名称
    private String major;//专业
    private int personCount;//班级人数
    private String college;//学院
    private String stuPhoto;//学生照片
    private String stuName;//姓名
    private String stuSex;//性别
    private String stuBirthTime;//出生日期
    private String stuProvince;//籍贯
    private String stuNation;//民族
    private String stuFace;//政治面貌
    private String stuStudyTime;//学制
    private String stuSchoolTime;//入学时间
    private String stuDormitory;//宿舍
    private String stuPhone;//联系电话
    private String stuEMail;//邮件地址
    private String stuPost;//邮编
    private String stuID;//身份证号
    private String stuIsGraduate;//是否毕业
    private String stuGraduateDate;//毕业日期
    private String stuFatherName;//父亲姓名
    private String stuFatherJob;//父亲职业
    private String stuFatherPhone;//父亲联系方式
    private String stuMotherName;//母亲姓名
    private String stuMotherJob;//母亲职业
    private String stuMotherPhone;//母亲联系方式

    public StudentInfo() {
    }

    public StudentInfo(String stuNo, String classNo, String className, String teaName, String major, int personCount, String college, String stuPhoto, String stuName, String stuSex, String stuBirthTime, String stuProvince, String stuNation, String stuFace, String stuStudyTime, String stuSchoolTime, String stuDormitory, String stuPhone, String stuEMail, String stuPost, String stuID, String stuIsGraduate, String stuGraduateDate, String stuFatherName, String stuFatherJob, String stuFatherPhone, String stuMotherName, String stuMotherJob, String stuMotherPhone) {
        this.stuNo = stuNo;
        this.classNo = classNo;
        this.className = className;
        this.teaName = teaName;
        this.major = major;
        this.personCount = personCount;
        this.college = college;
        this.stuPhoto = stuPhoto;
        this.stuName = stuName;
        this.stuSex = stuSex;
        this.stuBirthTime = stuBirthTime;
        this.stuProvince = stuProvince;
        this.stuNation = stuNation;
        this.stuFace = stuFace;
        this.stuStudyTime = stuStudyTime;
        this.stuSchoolTime = stuSchoolTime;
        this.stuDormitory = stuDormitory;
        this.stuPhone = stuPhone;
        this.stuEMail = stuEMail;
        this.stuPost = stuPost;
        this.stuID = stuID;
        this.stuIsGraduate = stuIsGraduate;
        this.stuGraduateDate = stuGraduateDate;
        this.stuFatherName = stuFatherName;
        this.stuFatherJob = stuFatherJob;
        this.stuFatherPhone = stuFatherPhone;
        this.stuMotherName = stuMotherName;
        this.stuMotherJob = stuMotherJob;
        this.stuMotherPhone = stuMotherPhone;
    }
}
