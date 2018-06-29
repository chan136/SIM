package com.jerry.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

/**
 * @author long chen
 * @date 2018/3/26
 * @description 学生-课程，选课
 */
@Data
@Entity
@Table(name = "STUCOURSE")
public class StuCourse implements Serializable{

    private static final long serialVersionUID = 6205532682203519999L;

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;//序号

    @Column(length = 20)
    private String stuNo;//学号
    @Column(length = 20)
    private String courseNo;//课程编号

}
