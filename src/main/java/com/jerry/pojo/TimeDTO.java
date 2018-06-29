package com.jerry.pojo;

import lombok.Data;

import java.io.Serializable;

/**
 * @author long chen
 * @date 2018/4/24
 * @description
 */
@Data
public class TimeDTO implements Serializable {
    private static final long serialVersionUID = 8768995694375420304L;

    private String stuNo;
    private String schoolYear;
    private String schoolTerm;

    public TimeDTO() {
    }

    public TimeDTO(String stuNo, String schoolYear, String schoolTerm) {
        this.stuNo = stuNo;
        this.schoolYear = schoolYear;
        this.schoolTerm = schoolTerm;
    }
}
