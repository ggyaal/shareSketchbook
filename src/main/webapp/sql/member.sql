DROP TABLE user_keys;
DROP TABLE user_authority;

CREATE TABLE user_keys (
	userKey varchar2(10) PRIMARY KEY,		-- 회원 아이디
	password varchar2(80) NOT NULL,			-- 비밀번호
	emailId varchar2(20) UNIQUE,			-- 이메일 아이디
	name varchar2(10) NOT NULL,				-- 이름
	nickName varchar2(20) UNIQUE NOT NULL,	-- 닉네임
	gender varchar2(5) NOT NULL,			-- 성별
	lv number DEFAULT 0,					-- 레벨
	photo varchar2(100),					-- 사진
	enabled number DEFAULT 1				-- 계정 활성화/비활성화
);

CREATE TABLE user_authority (
	userKey varchar2(10) NOT NULL,
	auth varchar2(20) NOT NULL,
	CONSTRAINT user_auth FOREIGN KEY(userKey) REFERENCES user_keys(userKey) ON DELETE CASCADE
);