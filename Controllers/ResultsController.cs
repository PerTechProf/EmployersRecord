using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace EmployersRecord.Controllers
{
    [ApiController]
    [Route("api/[controller]/{[action]=Index}")]
    public class ResultsController : ControllerBase
    {
        private readonly ILogger<ResultsController> _logger;

        public ResultsController(ILogger<ResultsController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{id:int}")]
        public async Task<bool> IsAccepted(int id)
        {
            return id % 2 == 0 ? true : false;
        }

        [HttpGet]
        public async Task<object> Index(int count)
        {
            var objects = new List<object>(){
                new {name = "aaa", id = 1}, 
                new {name = "bbb", id = 2}, 
                new {name = "ccc", id = 4},
                new {name = "aaa", id = 5}, 
                new {name = "bbb", id = 6}, 
                new {name = "ccc", id = 7},
                new {name = "aaa", id = 12}, 
                new {name = "bbb", id = 14}, 
                new {name = "ccc", id = 15}
            };
            return objects.Take(count);
        }
    }
}
