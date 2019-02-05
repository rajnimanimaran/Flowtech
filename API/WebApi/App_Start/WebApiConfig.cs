﻿using WebApi.ActionFilters;
using WebApi.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
           //var cors = new EnableCorsAttribute("35.162.203.7", "*", "*");
           //config.EnableCors(cors);
            config.MapHttpAttributeRoutes();

            config.Filters.Add(new LoggingFilterAttribute());            

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
