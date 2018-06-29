package com.jerry.pojo;

import lombok.Data;

/**
 * @author long chen
 * @date 2018/4/17
 * @description
 */
@Data
public class CourseTableInfo {

    private String schoolYear;
    private String schoolTerm;
    private String stuNo;
    private String stuName;
    private String classNo;
    private String courseNo;
    private String courseName;
    private String courseKind;
    private String courseCredit;
    private String courseWeek;
    private String teaName;
    private String courseTime;
    private String coursePlace;

    public CourseTableInfo() {
    }

    public CourseTableInfo(String schoolYear, String schoolTerm, String stuNo, String stuName, String classNo, String courseNo, String courseName, String courseKind, String courseCredit, String courseWeek, String teaName, String courseTime, String coursePlace) {
        this.schoolYear = schoolYear;
        this.schoolTerm = schoolTerm;
        this.stuNo = stuNo;
        this.stuName = stuName;
        this.classNo = classNo;
        this.courseNo = courseNo;
        this.courseName = courseName;
        this.courseKind = courseKind;
        this.courseCredit = courseCredit;
        this.courseWeek = courseWeek;
        this.teaName = teaName;
        this.courseTime = courseTime;
        this.coursePlace = coursePlace;
    }
}
