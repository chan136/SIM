package com.jerry.pojo;

import lombok.Data;

import javax.persistence.Column;
import java.io.Serializable;

/**
 * @author long chen
 * @date 2018/4/24
 * @description
 */
@Data
public class CourseChoose implements Serializable {
    private static final long serialVersionUID = -3973216998099083447L;

    private String courseNo;//课程编号
    private String courseName;//课程名称
    private String courseKind;//课程性质
    private int count;//上课人数
    private String teaName;//授课教师
    private String courseCredit;//课程学分
    private String courseWeek;//课时周数
    private String courseTime;//上课时间
    private String coursePlace;//上课地点

    public CourseChoose() {
    }

    public CourseChoose(String courseNo, String courseName, String courseKind, int count, String teaName, String courseCredit, String courseWeek, String courseTime, String coursePlace) {
        this.courseNo = courseNo;
        this.courseName = courseName;
        this.courseKind = courseKind;
        this.count = count;
        this.teaName = teaName;
        this.courseCredit = courseCredit;
        this.courseWeek = courseWeek;
        this.courseTime = courseTime;
        this.coursePlace = coursePlace;
    }
}
