using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities(CancellationToken ct)
        {
            return await Mediator.Send(new List.Query(),ct);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivities(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id=id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity) // using IActionResul instead of Action Result because we are not returnin and type
        {
           return Ok( await Mediator.Send(new Create.Command{Activity=activity}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity) // using IActionResul instead of Action Result because we are not returnin and type
        {
           activity.Id =id;
           return Ok( await Mediator.Send(new Edit.Command{Activity=activity}));
        }

         [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id) // using IActionResul instead of Action Result because we are not returnin and type
        {

           return Ok( await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}