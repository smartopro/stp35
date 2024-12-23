import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCSSExtractPlugin from "mini-css-extract-plugin";
import {CleanWebpackPlugin} from "clean-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import dotenv from "dotenv";
import ImageminPlugin from "imagemin-webpack-plugin";
import imageminMozjpeg from "imagemin-mozjpeg";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import path from "path";
import webpack from "webpack";
import RobotstxtPlugin from "robotstxt-webpack-plugin";
const __dirname = path.resolve();

export default (env = {}) => {
    const {mode = "development"} = env;
    const isDev = mode === "development";
    const isProd = mode === "production";
	const dotenvConfig = dotenv.config({ path: `./config/.env.${mode}.local` }).parsed;

	const basePath = process.env.BASE_PATH;
	const fileName = basePath && basePath[basePath.length - 1] === "/" ? "sitemap.xml" : "/sitemap.xml"

    const getPlugins = () => {
		// load env-variables
		const envVariables = Object.fromEntries(
			Object
				.entries(dotenvConfig)
				.map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)])
		);

		const ogImageName = dotenvConfig.BASE_PATH && dotenvConfig.BASE_PATH[dotenvConfig.BASE_PATH.length - 1] === "/" ? "images/og-title.jpg" : "/images/og-title.jpg";

        const plugins = [
			new CleanWebpackPlugin(),
			new webpack.DefinePlugin({
				...envVariables,
				"process.env.isProd": isProd
			}),
            new HtmlWebpackPlugin({
				inject: false,
				chunks: ["main"],
				template: path.join("ejs", "index.ejs"),
				filename: "index.html",
				baseHref: dotenvConfig.SERVER_NAME ? `${dotenvConfig.SERVER_NAME}${dotenvConfig.BASE_PATH}` : "",
				lang: "ru",
				meta: [
					{ charset: "utf-8" },
					{ content: "ie=edge", "http-equiv": "x-ua-compatible" },
					{ name: "description", content: "Профессиональные работы по отоплению, водоотведению и канализации. Полный комплекс работ по сантехнике. Обслуживание домов и работа с управляющими компаниями. Аварийно-диспетчерское обслудивание.", lang: "ru" },
					{ name: "author", content: "Smarto" },
					{ name: "robots", content: isProd ? "index, follow" : "none" },
					{ name: "theme-color", content: "#FF542F" },
					{ property: "og:title", content: "Сантехпром - сантехнические работы любой сложности" },
					{ property: "og:description", content: "Профессиональные работы по отоплению, водоотведению и канализации. Полный комплекс работ по сантехнике. Обслуживание домов и работа с управляющими компаниями. Аварийно-диспетчерское обслудивание." },
					{ property: "og:image", content: `${dotenvConfig.SERVER_NAME}${dotenvConfig.BASE_PATH}${ogImageName}` },
					{ property: "og:image:type", content: "image/jpeg" },
					{ property: "og:image:width", content: "700" },
					{ property: "og:image:height", content: "700" },
					{ property: "og:type", content: "website" },
					{ property: "og:url", content: `${dotenvConfig.SERVER_NAME}${dotenvConfig.BASE_PATH}` },
					{ property: "og:locale", content: "ru_RU" },
					{ property: "og:site_name", content: "Сайт «Сантехпром»" }
				],
				headHtmlSnippet: `
                    <!--[if lt IE 9]>
                        <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/r29/html5.min.js"></script>
                    <![endif]-->
                `,
				title: "Сантехпром",
				mobile: true,
				links: [
					{ rel: "canonical", href: `${dotenvConfig.SERVER_NAME}${dotenvConfig.BASE_PATH}` },
					{ rel: "preconnect", href: "//api-maps.yandex.ru" },
					{ rel: "dns-prefetch", href: "//api-maps.yandex.ru" },
					{ rel: "preconnect", href: "//mc.yandex.ru" },
					{ rel: "dns-prefetch", href: "//mc.yandex.ru" }
				],
				mode: mode,
				yandexMetrika: `
					<script type="text/javascript" >
					   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
					   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
					   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
					   ym(85690102, "init", {
							clickmap:true,
							trackLinks:true,
							accurateTrackBounce:true,
							webvisor:true
					   });
					</script>
					<noscript><div><img src="https://mc.yandex.ru/watch/85690102" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
				`,
				minify: isProd
			})
        ];

        if (isProd) {
            plugins.push(
                new MiniCSSExtractPlugin({
                    filename: "style/main-[fullhash:8].css"
                })
            );

			plugins.push(
				new CopyWebpackPlugin({
					patterns: [
						{ from: "./ejs/.htaccess", to: "./.htaccess", toType: "file"},
						{ from: "./images/og-title.jpg", to: "./images/og-title.jpg", toType: "file"},
					]
				})
			);

			plugins.push(
				new RobotstxtPlugin({
					policy: [
						{
							userAgent: "*",
							allow: "/",
							crawlDelay: 10,
							cleanParam: "utm_source&utm_medium&utm_campaign"
						},
					],
					sitemap: `${process.env.SERVER_NAME}${basePath}${fileName}`,
					host: process.env.SERVER_NAME,
				})
			);

			plugins.push(
				new FaviconsWebpackPlugin({
					logo: "./images/favicon.png",
					prefix: "./images/favicons_[contenthash:4]/",
					cache: true,
					favicons: {
						background: "#fff",
						theme_color: "#2396FF",
						icons: {
							android: isProd,              // Create Android homescreen icon. `boolean` or `{ offset, background }`
							appleIcon: isProd,             // Create Apple touch icons. `boolean` or `{ offset, background }`
							appleStartup: false,         // Create Apple startup images. `boolean` or `{ offset, background }`
							coast: false,                // Create Opera Coast icon. `boolean` or `{ offset, background }`
							favicons: isProd,              // Create regular favicons. `boolean`
							firefox: false,              // Create Firefox OS icons. `boolean` or `{ offset, background }`
							windows: false,              // Create Windows 8 tile icons. `boolean` or `{ background }`
							yandex: false                // Create Yandex browser icon. `boolean` or `{ background }`
						}
					}
				})
			);

			// Compress images
			plugins.push(
				new ImageminPlugin.default({
					test: /\.(jpe?g|png|gif|svg|webp)$/i,
					optipng: {
						optimizationLevel: 6,
					},
					svgo: {
						plugins: [ {
							removeViewBox: false
						}, {
							convertStyleToAttrs: false
						}]
					},
					pngquant: {},
					plugins: [
						imageminMozjpeg({
							quality: 70,
							progressive: true
						})
					]
				})
			);
        }

        return plugins;
    }

    const cssLoaders = (extra, module = false) => {
        let loaders = [
            isProd ? MiniCSSExtractPlugin.loader : "style-loader",
            {
                loader: "css-loader",
                options: {
                	sourceMap: isDev,
                    importLoaders: 2,
                    modules: module ? {
                        localIdentName: "[local]___[name]___[hash:base64:5]"
                    } : false
                }
            }
        ];

        // post css
        if (isProd) {
            loaders.push({
                loader: "postcss-loader",
                options: {
                    postcssOptions: {
                        plugins: [[
                            "postcss-preset-env"
                        ]],
                    },
                },
            });
        }

        // extra css
        if (extra) {
            if (typeof extra === "string") {
                loaders.push(extra);
            } else if (Array.isArray(extra)) {
                loaders = loaders.concat(extra);
            }
        }

        return loaders;
    }

    return {
        context: path.resolve(__dirname, "./src"),
        mode: mode,
        devServer: {
            port: process.env.PORT_CLIENT,
            open: true,
            hot: true,
			host: process.env.LOCALHOST,
            watchContentBase: true,
			historyApiFallback: true,
			publicPath: "/",
			disableHostCheck: true,
			proxy: {
            	"/api": { target: `http://${process.env.LOCALHOST}:${process.env.PORT_SERVER}` },
				// path rewrite for F5-problem
				"/*/**": {
					pathRewrite: function (path, req) {
						const index = req.rawHeaders.findIndex(item => item === "Referer");
						if (index === -1) return ""; // not found header
						const u = req.rawHeaders[index + 1].replace(/\/[^\/]*$/, "");
						const url = new URL(u);
						const pathName = url.pathname;
						return req.url.replace(pathName, "");
					},
					target: `http://${process.env.LOCALHOST}:${process.env.PORT_CLIENT}`,
					changeOrigin: false
				}
			}
        },
        entry: {
        	main: "./index.tsx"
		},
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
			alias: {
				"@": path.resolve(__dirname, "src"),
				"components": path.resolve(__dirname, "src", "components"),
				"classes": path.resolve(__dirname, "src", "classes"),
				"store": path.resolve(__dirname, "src", "store"),
				"style": path.resolve(__dirname, "src", "style"),
				"assets": path.resolve(__dirname, "src", "assets"),
				"images": path.resolve(__dirname, "src", "images")
			}
        },
		optimization: {
			splitChunks: {
				chunks: isProd ? "all" : "async"
			},
			minimizer: [
				`...`,
				new CssMinimizerPlugin()
			]
		},
        output: {
            filename: "js/[name].[fullhash:8].js",
            path: path.resolve(__dirname, `dist/${isProd ? "release" : "debug"}`),
			chunkFilename: "js/[id].[fullhash:8].js",
			hashFunction: "xxhash64",
        },
		target: isProd ? "browserslist" : "web", // disable browserslist for development
		devtool: isProd ? undefined : "source-map",
        plugins: getPlugins(),
        module: {
            rules: [
				// HTML
				{
					test: /\.ejs$/i,
					exclude: /node_modules/,
					loader: "ejs-loader",
					options: {
						esModule: false
					}
				},

                // Babel loader
                {
                    test: /\.[jt]sx?$/,
                    exclude: /node_modules/,
                    use: "babel-loader"
                },

                // CSS loaders
                {
                    test: /\.(css)$/,
                    use: cssLoaders()
                },

                // SCSS loaders
                // SCSS except modules
                {
                    test: /\.(s[ca]ss)$/,
                    exclude: /\.module\.s[ca]ss$/,
                    use: cssLoaders("sass-loader", false)
                },
                // SCSS modules
                {
                    test: /\.module\.s[ca]ss$/,
                    use: cssLoaders("sass-loader", true)
                },
				// Loading fonts & images
				{
					test: /\.(ttf|otf|eot|woff2?|svg|jpe?g|png|gif)$/,
					exclude: /\.inline\.svg$/,
					type: "asset/resource",
					generator: {
						filename: `[path][name]${isProd ? "-[hash:8]" : ""}[ext]`
					}
				},
				{
					test: /\.(docx?)$/,
					type: "asset/resource",
					generator: {
						filename: "assets/[name]-[hash:8][ext]"
					}

				},
				{
					test: /\.inline\.svg$/,
					type: "asset/source"
				}
            ],
        },
    }
}
