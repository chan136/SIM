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
 * @description 班级
 */
@Data
@Entity
@Table(name = "CLASS")
public class Class implements Serializable {

    private static final long serialVersionUID = 258978375378044919L;

    @Id
    @Column(length = 20)
    private String classNo;//班级编号

    @Column(unique = true,length = 20)
    private String className;//班级名称
    @Column(length = 20)
    private String major;//专业名称
    @Column(length = 5)
    private int personCount;//班级人数
    @Column(length = 20)
    private String college;//所属学院

}
