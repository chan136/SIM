package com.jerry.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

/**
 * @author long chen
 * @date 2018/3/26
 * @description 学生
 */
@Data
@Entity
@Table(name = "STUDENT")
public class Student implements Serializable {

    private static final long serialVersionUID = 258978375378044919L;

    @Id
    @Column(length = 20)
    private String stuNo;//学号

    @Column(length = 20)
    private String classNo;//班级编号
    @Column(length = 20)
    private String stuPhoto;//学生照片
    @Column(length = 20)
    private String stuName;//姓名
    @Column(length = 20)
    private String stuSex;//性别
    @Column(length = 20)
    private String stuBirthTime;//出生日期
    @Column(length = 20)
    private String stuProvince;//籍贯
    @Column(length = 20)
    private String stuNation;//民族
    @Column(length = 20)
    private String stuFace;//政治面貌
    @Column(length = 20)
    private String stuStudyTime;//学制
    @Column(length = 20)
    private String stuSchoolTime;//入学时间
    @Column(length = 20)
    private String stuDormitory;//宿舍
    @Column(length = 20)
    private String stuPhone;//联系电话
    @Column(length = 20)
    private String stuEMail;//邮件地址
    @Column(length = 20)
    private String stuPost;//邮编
    @Column(length = 20)
    private String stuID;//身份证号
    @Column(length = 20)
    private String stuIsGraduate;//是否毕业
    @Column(length = 20)
    private String stuGraduateDate;//毕业日期
    @Column(length = 20)
    private String stuFatherName;//父亲姓名
    @Column(length = 20)
    private String stuFatherJob;//父亲职业
    @Column(length = 20)
    private String stuFatherPhone;//父亲联系方式
    @Column(length = 20)
    private String stuMotherName;//母亲姓名
    @Column(length = 20)
    private String stuMotherJob;//母亲职业
    @Column(length = 20)
    private String stuMotherPhone;//母亲联系方式

    @Transient
    @JsonProperty("beginTime")
    private String beginTime;   //查询起始时间
    @Transient
    @JsonProperty("endTime")
    private String endTime;    //查询结束时间

}
