package com.jerry.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

/**
 * @author long chen
 * @date 2018/3/26
 * @description 老师-课程，授课
 */
@Data
@Entity
@Table(name = "TEACOURSE")
public class TeaCourse implements Serializable{

    private static final long serialVersionUID = 6205532682203519999L;

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;//序号

    @Column(length = 20)
    private String teaNo;//教师编号
    @Column(length = 20)
    private String teaName;//教师姓名
    @Column(length = 20)
    private String courseNo;//课程编号
    @Column(length = 20)
    private String courseName;//课程名称

}
