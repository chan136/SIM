package com.jerry.pojo;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * @author long chen
 * @date 2018/3/26
 * @description 课程
 */
@Data
@Entity
@Table(name = "COURSE")
public class Course implements Serializable {

    private static final long serialVersionUID = -7479035010176271935L;

    @Column(length = 20)
    private String schoolYear;//学年

    @Column(length = 20)
    private String schoolTerm;//学期

    @Id
    @Column(length = 20)
    private String courseNo;//课程编号

    @Column(length = 20)
    private String courseName;//课程名
    @Column(length = 5)
    private String courseCredit;//课程学分
    @Column(length = 4)
    private String courseKind;//课程性质
    @Column(length = 4)
    private String courseWeek;//课时周数
    @Column(columnDefinition="int default 100")
    private int count;//上课人数


}
