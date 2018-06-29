package com.jerry.pojo;

import lombok.Data;

import java.io.Serializable;

/**
 * @author long chen
 * @date 2018/4/23
 * @description
 */
@Data
public class CourseTableDTO implements Serializable {
    private static final long serialVersionUID = 8089746552611529008L;

    private String stuNo;
    private String schoolYear;
    private String schoolTerm;

    public CourseTableDTO() {
    }

    public CourseTableDTO(String stuNo, String schoolYear, String schoolTerm) {
        this.stuNo = stuNo;
        this.schoolYear = schoolYear;
        this.schoolTerm = schoolTerm;
    }
}
