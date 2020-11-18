package kr.co.shareSketchbook.handler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

public class MybatisDateTypeHandler extends BaseTypeHandler<LocalDateTime>{
	
	@Override
	public void setNonNullParameter(PreparedStatement ps, int i, LocalDateTime parameter, JdbcType jdbcType)
			throws SQLException {
		ps.setTimestamp(i, Timestamp.valueOf(parameter));
//		log.info("MybatisDateTypeHandler.setNonNullParameter(columnName) 호출함" + Timestamp.valueOf(parameter));
	}

	@Override
	public LocalDateTime getNullableResult(ResultSet rs, String columnName) throws SQLException {
//		log.info("MybatisDateTypeHandler.getNullableResult(columnName) 호출함");
		Timestamp timestamp = rs.getTimestamp(columnName);
//		log.info("resultSet : " + rs.getTimestamp(columnName));
		return getLocalDateTime(timestamp);
	}

	@Override
	public LocalDateTime getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
//		log.info("MybatisDateTypeHandler.getNullableResult(columnIndex) 호출함");
		 Timestamp timestamp = rs.getTimestamp(columnIndex);
	     return getLocalDateTime(timestamp);
	}

	@Override
	public LocalDateTime getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
//		log.info("MybatisDateTypeHandler.getNullableResult 호출함");
		 Timestamp timestamp = cs.getTimestamp(columnIndex);
	     return getLocalDateTime(timestamp);
	}
    
	private static LocalDateTime getLocalDateTime(Timestamp timestamp) {
        if (timestamp != null) {
            return timestamp.toLocalDateTime();
        }
        return null;
    }
}
