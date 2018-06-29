package com.jerry.pojo;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

/**
 * @author long chen
 * @date 2018/3/26
 * @description 学生成绩
 */
@Data
@Entity
@Table(name = "SCORE")
public class Score implements Serializable {

    private static final long serialVersionUID = -4052422362800952869L;

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;//序号

    @Column(length = 20)
    private String courseNo;//课程编号
    @Column(length = 20)
    private String courseName;//课程名称
    @Column(length = 20)
    private String stuNo;//学号
    @Column(length = 20)
    private String stuName;//学生姓名
    @Column(length = 5)
    private String courseScore;//课程分数
    @Column(length = 5)
    private String reStudyScore;//重修成绩
    @Column(length = 5)
    private String reTestScore;//补考成绩

}
