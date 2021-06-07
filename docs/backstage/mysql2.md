---
title: node操作mysql
date: 2019-10-05
sidebar: auto
categories:
  - node
tags:
  - node
---

```html
一、增：有2种方法

1.使用insert插入单行数据：

         语法：insert [into] < 表名> [列名] values < 列值>

　　 例：insert into Strdents (姓名,性别,出生日期) values ('王伟华','男','1983/6/15')

　　 注意：如果省略表名，将依次插入所有列

2.使用insert,select语句将现有表中的 数据添加到已有的新表中

        语法：insert into < 已有的新表> < 列名> select < 原表列名> from < 原表名>

　　例：insert into addressList ('姓名','地址','电子邮件')select name,address,email          

                from  Strdents 

      注意：查询得到的数据个数、顺序、数据类型等，必须与插入的项保持一致


二、删：有２中方法

1.使用delete删除数据某些数据

    语法：delete from < 表名> [where < 删除条件>]　　  

    例：delete from a where name='王伟华'（删除表a中列值为王伟华的行）　 

        注意：删除整行不是删除单个字段，所以在delete后面不能出现字段名

 

2.使用truncate table 删除整个表的数据

        语法：truncate table < 表名>

　   例：truncate table addressList

　  注意：删除表的所有行，但表的结构、列、约束、索引等不会被删除；不能

         用于有外建约束引用的表

 

三、改　　使用update更新修改数据         

    语法：update < 表名> set < 列名=更新值> [where < 更新条件>]

　　 例：update addressList set 年龄=18 where 姓名='王伟华'

　　 注意：set后面可以紧随多个数据列的更新值（非数字要引号）；where子句是可选的（非数字要引号），用来限制条件，如果不选则整个表的所有行都被更新

 

四、查

1.普通查询

    语法：select < 列名> from < 表名> [where < 查询条件表达试>] [order by < 排序的列  

          名>[asc或desc]]

　　　1).查询所有数据行和列

　　　　例：select * from a

　　　　说明：查询a表中所有行和

　　　2).查询部分行列--条件查询

　　　　例：select i,j,k   from  a   where f=5

　　　　说明：查询表a中f=5的所有行，并显示i,j,k３列

　　　3).在查询中使用ＡＳ更改列名

　　　　例：select name as 姓名　from a where  gender='男'

　　　　说明：查询a表中性别为男的所有行，显示name列，并将name列改名为（姓名）显示

　　　4).查询空行

　　　　例：select name from a where email is null

　　　　说明：查询表a中email为空的所有行，并显示name列；SQL语句中用is null或者is not null

                  来判断是否为空行

　　　5).在查询中使用常量

　　　　例：select name '北京' as 地址 from　a

　　　　说明：查询表a，显示name列，并添加地址列，其列值都为'北京'

　　　6).查询返回限制行数(关键字：top )

　　　　例１：select top 6 name from a

　　　　说明：查询表a，显示列name的前６行，top为关键字（oracle 中没有top关键字

             用rownum替代）

                          select   *   from   a where   rownum < 6  

　　　7). 查询排序（关键字：order by , asc , desc）

　　　　例：select name

　　　　　　from a

　　　　　　where grade>=60

　　　　　　order by desc

　　　　说明：查询表中成绩大于等于60的所有行，并按降序显示name列；默认为ＡＳＣ升序

２.模糊查询

　　　1).使用like进行模糊查询

　　　　注意：like运算副只用语字符串，

　　　　例：select * from a where name like '赵%'

　　　　说明：查询显示表a中，name字段第一个字为赵的记录

　　　2).使用between在某个范围内进行查询

　　　　例：select * from a where age between 18 and 20

　　　　说明：查询显示表a中年龄在18到20之间的记录

　　  3).使用in在列举值内进行查询(in后是多个的数据)

        例：select name from a where address in ('北京','上海','唐山')

　　　　说明：查询表a中address值为北京或者上海或者唐山的记录，显示name字段

３.分组查询

　　　1).使用group by进行分组查询

　　　　例：select studentID as 学员编号, AVG(score) as 平均成绩  (注释:这里的score是列名)

　　　　　　from score (注释:这里的score是表名)

　　　　　　group by studentID

           2).使用having子句进行分组筛选

　　　　例：select studentID as 学员编号, AVG　　　　

from score

　　　　　　group by studentID

　　　　　　having count(score) > 1

　　　　说明：接上面例子，显示分组后count(score)>1的行，由于where只能在没有分组

       时使用，分组后只能使用having来限制条件，

４.多表联接查询

　　　1).内联接

　　　　①在where子句中指定联接条件

　　　　例：select a.name,b.mark

　　　　　　from a,b

　　　　　　where a.name=b.name

　　　　说明：查询表a和表b中name字段相等的记录，并显示表a中的name字段和表b中的

            mark字段
```