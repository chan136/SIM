package com.jerry.web;

import com.jerry.common.utils.*;
import com.jerry.pojo.*;
import com.jerry.pojo.Class;
import com.jerry.repository.*;
import com.jerry.security.JWTProvider;
import com.jerry.service.IUserService;
import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

import static com.jerry.common.utils.Des.encrypt;

/**
 * @author long chen
 * @date 2018/3/27
 * @description
 */
@RestController
public class Controller {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private IUserService userService;
    @Autowired
    private JWTProvider jwtProvider;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private ClassRepository classRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private CourseClassRepository courseClassRepository;
    @Autowired
    private CourseTableRepository courseTableRepository;
    @Autowired
    private ScoreRepository scoreRepository;
    @Autowired
    private StuCourseRepository stuCourseRepository;
    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private TeaClassRepository teaClassRepository;
    @Autowired
    private TeaCourseRepository teaCourseRepository;
    @Autowired
    private StatusRepository statusRepository;

    private static String FileName;

    @GetMapping("/test")
    public List<StudentInfo> test() {
        /*logger.info("获取所有学生");
        Student student = new Student();
        student.setStuNo("14223121");
        List<Student> list = studentRepository.findAll(StudentTools.where(student));
        logger.info("list.size: " + list.size());*/
        List<String> stuNo = new ArrayList<>();
        /*for (Student s : list) {
            stuNo.add(s.getStuNo());
        }*/
        return studentRepository.findInDetail(stuNo);
    }

    @PostMapping("/login")
    public String login(@RequestBody Users users, HttpServletResponse response) throws Exception {
        logger.info("登录中...");
        String token = userService.login(users);
        response.addHeader("Authorization", "Bearer " + token);
        return "";
    }

    @GetMapping("/verify/getInfo")
    public Users getInfo(HttpServletRequest request) {
        logger.info("获取登录用户信息");
        String token = request.getHeader("Authorization");
        if (token.length() != 0) {
            token = token.substring(7, token.length());
            logger.info(token);
            String username = jwtProvider.parse(token);
            Users users = userService.findByUsername(username);
            return users;
        }
        return null;
    }

    @PostMapping("/getUser")
    public List<Users> getUser(@RequestBody Users users) {
        logger.info("获取用户信息");
        return userRepository.findAll(UserTools.where(users));
    }

    @PostMapping("/addUser")
    public int addUser(@RequestBody Users users) {
        logger.info("新增用户信息");
        users.setPassword(encrypt(users.getUsername()));
        userRepository.save(users);
        return 1;
    }

    @PostMapping("/updatePassword")
    public int updatePassword(@RequestBody Users users) {
        logger.info("修改用户密码");
        users.setPassword(encrypt(users.getPassword()));
        userRepository.save(users);
        return 1;
    }

    @PostMapping("/updateUser")
    public int updateUser(@RequestBody Users users) {
        logger.info("修改用户信息");
        userRepository.save(users);
        return 1;
    }

    @PostMapping("/deleteUser")
    public int deleteUser(@RequestBody Users users) {
        logger.info("删除用户信息");
        userRepository.delete(users);
        return 1;
    }

    @PostMapping("/getStudent")
    public List<StudentInfo> getStudent(@RequestBody Student student) {
        logger.info("获取所有学生");
        List<Student> list = studentRepository.findAll(StudentTools.where(student));
        if (list.size() == 0) {
            return null;
        }
        List<String> stuNo = new ArrayList<>();
        for (Student s : list) {
            stuNo.add(s.getStuNo());
        }
        return studentRepository.findInDetail(stuNo);
    }

    @PostMapping("/upload")
    public int upload(HttpServletRequest request) {
        System.out.println("fileName: " + FileName);

        FileOutputStream fos = null;
        try {
            InputStream is = request.getInputStream();
            fos = new FileOutputStream("E:/IntelliJ/SIM/src/main/resources/static/photo/" + FileName + ".jpg");
            int len = 0;
            byte[] ch = new byte[1024];
            while ((len = is.read(ch)) != -1) {
                fos.write(ch,0,len);
            }
            fos.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                fos.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return 1;
    }

    @PostMapping("/getFileName")
    public void getFileName(@RequestBody String fileName){
        System.out.println("getFileName" + fileName);
        FileName = fileName;
    }

    @PostMapping("/saveStudent")
    public int saveStudent(@RequestBody Student student) {
        logger.info("保存学生");
        logger.info("student: " + student);
        if (student.getStuNo() == null || student.getClassNo() == null || student.getStuName() == null || student.getStuNo().trim().equals("") || student.getClassNo().trim().equals("") || student.getStuName().trim().equals("")) {
            return 0;
        } else if (classRepository.findClassByClassNo(student.getClassNo()) == null) {
            return -1;
        }
        student.setStuPhoto(student.getStuNo());
        studentRepository.save(student);
        //将其添加为用户
        Users users = new Users();
        users.setUsername(student.getStuNo());
        users.setPassword(encrypt(student.getStuNo()));
        users.setPermission("student");
        userRepository.save(users);
        //更新班级人数
        String classNo = student.getClassNo();
        List<Student> list = studentRepository.findStudentsByClassNo(classNo);
        classRepository.updateClass(list.size(),classNo);
        return 1;
    }

    @PostMapping("/deleteStudent")
    public int deleteStudent(@RequestBody Student student) {
        logger.info("删除学生");
        studentRepository.delete(student);
        //删除对应用户
        Users users = new Users();
        users.setUsername(student.getStuNo());
        users.setPassword(encrypt(student.getStuNo()));
        users.setPermission("student");
        userRepository.delete(users);
        //更新班级人数
        String classNo = student.getClassNo();
        List<Student> list = studentRepository.findStudentsByClassNo(classNo);
        classRepository.updateClass(list.size(),classNo);
        return 1;
    }

    @PostMapping("/deleteStudentByStuNo")
    public int deleteStudentByStuNo(@RequestBody Student student) {
        logger.info("根据学号删除学生");
        studentRepository.delete(student);
        //删除对应用户
        Users users = new Users();
        users.setUsername(student.getStuNo());
        users.setPassword(encrypt(student.getStuNo()));
        users.setPermission("student");
        userRepository.delete(users);
        //更新班级人数
        String classNo = student.getClassNo();
        List<Student> list = studentRepository.findStudentsByClassNo(classNo);
        classRepository.updateClass(list.size(),classNo);
        return 1;
    }

    @PostMapping("/getTeacher")
    public List<Teacher> getTeacher(@RequestBody Teacher teacher) {
        logger.info("获取所有教师");
        return teacherRepository.findAll(TeacherTools.where(teacher));
    }

    @PostMapping("/saveTeacher")
    public int saveTeacher(@RequestBody Teacher teacher) {
        logger.info("保存教师");
        teacherRepository.save(teacher);
        //将其添加为用户
        Users users = new Users();
        users.setUsername(teacher.getTeaNo());
        users.setPassword(encrypt(teacher.getTeaNo()));
        users.setPermission("teacher");
        userRepository.save(users);
        return 1;
    }

    @PostMapping("/deleteTeacher")
    public int deleteTeacher(@RequestBody Teacher teacher) {
        logger.info("删除教师");
        teacherRepository.delete(teacher);
        //删除对应用户
        Users users = new Users();
        users.setUsername(teacher.getTeaNo());
        users.setPassword(encrypt(teacher.getTeaNo()));
        users.setPermission("teacher");
        userRepository.delete(users);
        return 1;
    }

    @PostMapping("/getCourse")
    public List<Course> getCourse(@RequestBody Course course) {
        logger.info("获取所有课程");
        logger.info("course: " + course);
        return courseRepository.findAll(CourseTools.where(course));
    }

    @PostMapping("/saveCourse")
    public int saveCourse(@RequestBody Course course) {
        logger.info("保存课程");
        courseRepository.save(course);
        return 1;
    }

    @PostMapping("/deleteCourse")
    public int deleteCourse(@RequestBody Course course) {
        logger.info("删除课程");
        courseRepository.delete(course);
        return 1;
    }

    @PostMapping("/getClass")
    public List<Class> getClass(@RequestBody Class classes) {
        logger.info("获取所有班级");
        return classRepository.findAll(ClassTools.where(classes));
    }

    @PostMapping("/saveClass")
    public int saveClass(@RequestBody Class classes) {
        logger.info("保存班级");
        classRepository.save(classes);
        return 1;
    }

    @PostMapping("/deleteClass")
    public int deleteClass(@RequestBody Class classes) {
        logger.info("删除班级");
        classRepository.delete(classes);
        return 1;
    }

    @PostMapping("/getCourseTableInfo")
    public List<CourseTableInfo> getCourseTableInfo(@RequestBody Student student) {
        logger.info("获取详细学生课程表");
        List<Student> list = studentRepository.findAll(StudentTools.where(student));
        List<String> stuNoList = new ArrayList<>();
        if (list.size() == 0) {
            return null;
        }
        for (Student s : list) {
            stuNoList.add(s.getStuNo());
        }
        if (courseTableRepository.findInDetail(stuNoList).size() == 0) {//如果学生没有选课
            return courseTableRepository.findInDetailNoStuCourse(stuNoList);
        }
        return courseTableRepository.findInDetail(stuNoList);
    }

    @PostMapping("/findPersonInDetail")
    public List<CourseTableInfo> findPersonInDetail(@RequestBody CourseTableDTO dto) {
        logger.info("获取个人课程表");
        logger.info("dto: " + dto);
        if (courseTableRepository.findPersonInDetail(dto.getStuNo(),dto.getSchoolYear(),dto.getSchoolTerm()).size() == 0) {//如果学生没有选课
            return courseTableRepository.findPersonInDetailNoStuCourse(dto.getStuNo(),dto.getSchoolYear(),dto.getSchoolTerm());
        }
        return courseTableRepository.findPersonInDetail(dto.getStuNo(),dto.getSchoolYear(),dto.getSchoolTerm());
    }

    @PostMapping("/getCourseTable")
    public List<CourseTable> getCourseTable(@RequestBody CourseTable table) {
        logger.info("获取所有学生课程表");
        return courseTableRepository.findAll(CourseTableTools.where(table));
    }

    @PostMapping("/saveCourseTable")
    public int saveCourseTable(@RequestBody CourseTable table) {
        logger.info("保存课程表");
        Class classes = classRepository.findClassByClassNo(table.getClassNo());
        Course course = courseRepository.findCourseByCourseNo(table.getCourseNo());
        if (classes == null || course == null) {
            return 0;
        }
        table.setSchoolYear(course.getSchoolYear());
        table.setSchoolTerm(course.getSchoolTerm());
        table.setClassName(classes.getClassName());
        table.setCourseName(course.getCourseName());
        table.setMajor(classes.getMajor());
        table.setCollege(classes.getCollege());
        courseTableRepository.save(table);
        return 1;
    }

    @PostMapping("/deleteCourseTable")
    public int deleteCourseTable(@RequestBody CourseTable table) {
        logger.info("删除课程表");
        courseTableRepository.delete(table);
        return 1;
    }

    @PostMapping("/getStuCourse")
    public List<CourseChoose> getStuCourse(@RequestBody TimeDTO dto) {
        logger.info("获取选课信息");
        logger.info("dto: " + dto);
        logger.info("result"+stuCourseRepository.findInDetail(dto.getStuNo(),dto.getSchoolYear(),dto.getSchoolTerm()));
        return stuCourseRepository.findInDetail(dto.getStuNo(),dto.getSchoolYear(),dto.getSchoolTerm());
    }

    @PostMapping("/findInDetailCanChoose")
    public List<CourseChoose> findInDetailCanChoose(@RequestBody TimeDTO dto) {
        logger.info("获取可选课程信息");
        return stuCourseRepository.findInDetailCanChoose(dto.getStuNo(),dto.getSchoolYear(),dto.getSchoolTerm());
    }

    @PostMapping("/getStuCourseCount")
    public int getStuCourseCount(@RequestBody String courseNo) {
        logger.info("获取选择该课程的人数");
        return stuCourseRepository.findStuCoursesByCourseNo(courseNo).size();
    }

    @PostMapping("/saveStuCourse")
    public int saveStuCourse(@RequestBody StuCourse stuCourse) {
        logger.info("保存选课信息");
        StuCourse sc = stuCourseRepository.findStuCourseByStuNoAndCourseNo(stuCourse.getStuNo(),stuCourse.getCourseNo());
        if (sc != null) {
            return 0;
        }
        stuCourseRepository.save(stuCourse);
        return 1;
    }

    @PostMapping("/deleteStuCourse")
    public int deleteStuCourse(@RequestBody StuCourse stuCourse) {
        logger.info("退选课程");
        StuCourse sc = stuCourseRepository.findStuCourseByStuNoAndCourseNo(stuCourse.getStuNo(),stuCourse.getCourseNo());
        if (sc == null) {
            return 0;
        }
        stuCourseRepository.delete(sc);
        return 1;
    }

    @PostMapping("/getTeaClass")
    public List<TeaClass> getTeaClass(@RequestBody TeaClass teaClass) {
        logger.info("获取上课桥表信息");
        return teaClassRepository.findAll(TeaClassTools.where(teaClass));
    }

    @PostMapping("/saveTeaClass")//只需要传教师编号和班级编号
    public int saveTeaClass(@RequestBody TeaClass teaClass) {
        logger.info("保存上课桥表");
        Teacher teacher = teacherRepository.findTeacherByTeaNo(teaClass.getTeaNo());
        Class classes = classRepository.findClassByClassNo(teaClass.getClassNo());
        TeaClass tc = teaClassRepository.findTeaClassByTeaNoAndClassNo(teaClass.getTeaNo(),teaClass.getClassNo());
        if (teacher == null || classes == null) {
            return 0;
        } else if (tc != null) {
            return -1;
        }
        teaClass.setTeaName(teacher.getTeaName());
        teaClass.setClassName(classes.getClassName());
        teaClassRepository.save(teaClass);
        return 1;
    }

    @PostMapping("/deleteTeaClass")
    public int deleteTeaClass(@RequestBody TeaClass teaClass) {
        logger.info("删除上课桥表");
        teaClassRepository.delete(teaClass);
        return 1;
    }

    @PostMapping("/getTeaCourse")
    public List<TeaCourse> getTeaCourse(@RequestBody TeaCourse teaCourse) {
        logger.info("获取授课桥表信息");
        return teaCourseRepository.findAll(TeaCourseTools.where(teaCourse));
    }

    @PostMapping("/saveTeaCourse")//只需要传教师编号和课程编号
    public int saveTeaCourse(@RequestBody TeaCourse teaCourse) {
        logger.info("保存授课桥表");
        Teacher teacher = teacherRepository.findTeacherByTeaNo(teaCourse.getTeaNo());
        Course course = courseRepository.findCourseByCourseNo(teaCourse.getCourseNo());
        TeaCourse tc = teaCourseRepository.findTeaCourseByTeaNoAndCourseNo(teaCourse.getTeaNo(),teaCourse.getCourseNo());
        if (teacher == null || course == null) {
            return 0;
        } else if (tc != null) {
            return -1;
        }
        teaCourse.setTeaName(teacher.getTeaName());
        teaCourse.setCourseName(course.getCourseName());
        teaCourseRepository.save(teaCourse);
        return 1;
    }

    @PostMapping("/deleteTeaCourse")
    public int deleteTeaCourse(@RequestBody TeaCourse teaCourse) {
        logger.info("删除授课桥表");
        teaCourseRepository.delete(teaCourse);
        return 1;
    }

    @PostMapping("/getStudentInfoScore")
    public List<StudentInfoScore> getStudentInfoScore(@RequestBody String stuNo) {
        logger.info("获取学生个人信息byStuNo");
        logger.info("stuNo: " + stuNo);
        logger.info("findStudentScore: " + courseRepository.findStudentScore(stuNo));
        return courseRepository.findStudentScore(stuNo);
    }

    @PostMapping("/getScore")
    public List<Score> getScore(@RequestBody Score score) {
        logger.info("获取所有学生成绩信息");
        logger.info("score: " + score);
        return scoreRepository.findAll(ScoreTools.where(score));
    }

    @PostMapping("/saveScore")//只需要传学号和课程编号
    public int saveScore(@RequestBody Score score) {
        logger.info("保存学生成绩");
        System.out.println("score: " + score);
        Student student = studentRepository.findStudentByStuNo(score.getStuNo());
        Course course = courseRepository.findCourseByCourseNo(score.getCourseNo());
        if (student == null || course == null) {
            return 0;
        }
        score.setStuName(student.getStuName());
        score.setCourseName(course.getCourseName());
        scoreRepository.save(score);
        return 1;
    }

    @PostMapping("/deleteScore")
    public int deleteScore(@RequestBody Score score) {
        logger.info("删除学生成绩");
        scoreRepository.delete(score);
        return 1;
    }

    @PostMapping("/getCourseClass")
    public List<CourseClass> getCourseClass(@RequestBody CourseClass courseClass) {
        logger.info("获取开设课程桥表信息");
        return courseClassRepository.findAll(CourseClassTools.where(courseClass));
    }

    @PostMapping("/saveCourseClass")//只需要传课程编号和班级编号
    public int saveCourseClass(@RequestBody CourseClass courseClass) {
        logger.info("保存开设课程桥表信息");
        Course course = courseRepository.findCourseByCourseNo(courseClass.getCourseNo());
        Class classes = classRepository.findClassByClassNo(courseClass.getClassNo());
        CourseClass cc = courseClassRepository.findCourseClassByCourseNoAndClassNo(courseClass.getCourseNo(),courseClass.getClassNo());
        if (course == null || classes == null) {
            return 0;
        } else if (cc != null) {
            return -1;
        }
        courseClass.setCourseName(course.getCourseName());
        courseClass.setClassName(classes.getClassName());
        courseClassRepository.save(courseClass);
        return 1;
    }

    @PostMapping("/deleteCourseClass")
    public int deleteCourseClass(@RequestBody CourseClass courseClass) {
        logger.info("删除开设课程桥表信息");
        courseClassRepository.delete(courseClass);
        return 1;
    }

    @PostMapping("/saveStatus")
    public int saveStatus(@RequestBody String state) {
        logger.info("存储选课功能状态");
        Status Status = new Status("Status",state);
        statusRepository.save(Status);
        return 1;
    }

    @GetMapping("/getStatus")
    public String getStatus() {
        logger.info("获取选课功能状态");
        return statusRepository.findStatusByName("Status").getStatus();
    }

}
