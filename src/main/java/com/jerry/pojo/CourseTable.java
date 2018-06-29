package com.jerry.pojo;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

/**
 * @author long chen
 * @date 2018/3/26
 * @description 课程表
 */
@Data
@Entity
@Table(name = "COURSETABLE")
public class CourseTable implements Serializable {

    private static final long serialVersionUID = 6788946586467512954L;

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(length = 20)
    private String college;//学院
    @Column(length = 20)
    private String major;//专业
    @Column(length = 20)
    private String classNo;//班级编号
    @Column(length = 20)
    private String className;//班级名称
    @Column(length = 20)
    private String schoolYear;//学年
    @Column(length = 20)
    private String schoolTerm;//学期
    @Column(length = 20)
    private String courseNo;//课程编号
    @Column(length = 20)
    private String courseName;//课程名称
    @Column(length = 20)
    private String courseTime;//上课时间
    @Column(length = 20)
    private String coursePlace;//上课地点

}
