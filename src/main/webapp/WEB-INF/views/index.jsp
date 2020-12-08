<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="_csrf" content="${_csrf.headerName},${_csrf.parameterName},${_csrf.token}"/>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>shareSketchbook | main</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fullcalendar@5.4.0/main.min.css" />

<link rel="stylesheet" href="${pageContext.request.contextPath }/resources/css/main.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath }/resources/css/index.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath }/resources/css/calendar.css" />
</head>
<body>
	<div class="container">
		<div class="wrapper">
			<div class="main-book">
				<div class="main-book-cover move-page">
					<b>Share My SKETCHBOOK !</b>
				</div>
				<div id="p01" class="main-book-page move-page">
					<b>Hello Page 1!</b>
					<div class="page-content">
						
					</div>
				</div>
				<div id="p02" class="main-book-page move-page">
					<b>Hello Page 2!</b>
					<div class="page-content">
						
					</div>
				</div>
				<div id="p03" class="main-book-page move-page">
					<b>Hello Page 3!</b>
					<div class="page-content">
						
					</div>
				</div>
				<div id="p99" class="main-book-page move-page fixed-page">
					<b>final Page !</b>
					<div class="page-content">
						
					</div>
				</div>
			</div>
		</div>
	</div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/locale/ko.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/fullcalendar@5.4.0/main.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/fullcalendar@5.4.0/locales-all.min.js"></script>
	
	<script src="${pageContext.request.contextPath }/resources/js/main.js"></script>
	<script src="${pageContext.request.contextPath }/resources/js/index.js"></script>
	<script src="${pageContext.request.contextPath }/resources/js/calendar.js"></script>

</body>
</html>