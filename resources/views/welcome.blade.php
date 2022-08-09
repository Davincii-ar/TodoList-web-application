<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>HAMZA AR</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <!-- Styles -->
        <style>
            html, body {
                
                color: #ffffff;
                font-family: 'Comic Sans MS', sans-serif;
                font-weight: 200;
                height: 100vh;
                margin: 0;
            }

            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref {
                position: relative;
            }

            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }

            .content {
                text-align: center;
				z-index: 100;
				position: fixed;
				
            }

            .title {
                font-size: 84px;
            }

            .links > a {
                color: #ffffff;
                padding: 0 25px;
                font-size: 13px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }

            .m-b-md {
                margin-bottom: 30px;
            }
			.background {
				
				z-index: -100;
			}
        </style>
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            @if (Route::has('login'))
                <div class="top-right links">
                    @auth
                        <a href="{{ url('/home') }}">Home</a>
                    @else
                        <a href="{{ route('login') }}">Login</a>

                        @if (Route::has('register'))
                            <a href="{{ route('register') }}">Register</a>
                        @endif
                    @endauth
                </div>
            @endif
		<div class="background">
				<img src="back1.png" width="1950" height="990">
				</div>

            <div class="content">
				
                <div class="title m-b-md">
                    Todo liste Hamza Ar
                </div>

                <div class="links">
                    <a href="https://www.jetbrains.com/fr-fr/phpstorm/download/#section=windows">JetBrains</a>
                    <a href="https://www.mysql.com/fr/">MySQL</a>
                    <a href="https://blog.laravel.com">AJAX</a>
                    <a href="https://phpunit.de/">PHPUnit</a>
                    <a href="">Media Query</a>
                </div>
            </div>
        </div>
    </body>
</html>
