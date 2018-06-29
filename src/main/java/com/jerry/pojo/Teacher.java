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
 * @description 教师
 */
@Data
@Entity
@Table(name = "TEACHER")
public class Teacher implements Serializable {

    private static final long serialVersionUID = 258978375378044919L;

    @Id
    @Column(length = 20)
    private String teaNo;//教师编号

    @Column(length = 20)
    private String teaName;//姓名
    @Column(length = 5)
    private String teaSex;//性别
    @Column(length = 10)
    private String teaAge;//年龄
    @Column(length = 20)
    private String teaPhone;//联系电话
    @Column(length = 20)
    private String teaTitle;//职称
    @Column(length = 20)
    private String college;//学院

}
