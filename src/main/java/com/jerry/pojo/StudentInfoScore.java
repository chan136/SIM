package com.jerry.pojo;

import lombok.Data;

import java.io.Serializable;

/**
 * @author long chen
 * @date 2018/4/20
 * @description 学生个人成绩
 */
@Data
public class StudentInfoScore implements Serializable{
    private static final long serialVersionUID = -1189734831403730405L;

    private String stuNo;
    private String stuName;
    private String college;
    private String major;
    private String className;
    private String schoolYear;
    private String schoolTerm;
    private String courseNo;
    private String courseName;
    private String courseKind;
    private String courseCredit;
    private String courseScore;
    private String reTestScore;
    private String reStudyScore;

    public StudentInfoScore() {
    }

    public StudentInfoScore(String stuNo, String stuName, String college, String major, String className, String schoolYear, String schoolTerm, String courseNo, String courseName, String courseKind, String courseCredit, String courseScore, String reTestScore, String reStudyScore) {
        this.stuNo = stuNo;
        this.stuName = stuName;
        this.college = college;
        this.major = major;
        this.className = className;
        this.schoolYear = schoolYear;
        this.schoolTerm = schoolTerm;
        this.courseNo = courseNo;
        this.courseName = courseName;
        this.courseKind = courseKind;
        this.courseCredit = courseCredit;
        this.courseScore = courseScore;
        this.reTestScore = reTestScore;
        this.reStudyScore = reStudyScore;
    }
}
