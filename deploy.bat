@echo off

REM 构建生成静态文件
echo building...
call build.bat
echo building-complete

REM 进入生成的文件夹
cd dist

REM 如果是发布到自定义域名
REM echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

REM 如果发布到 https://gitee.com/<USERNAME>
REM git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
git push -f git@gitee.com:wj199624/wangjie.git master
REM driving_a_snail_to_knock_code.gitee.io/wangjie
REM 如果发布到 https://gitee.com/<USERNAME>/<REPO>
REM git push -f https://gitee.com/zguangju/ZGuangJu.git master:gh-pages


cd ..
cd ..
cd ..
echo Auto-Deploy-Complete