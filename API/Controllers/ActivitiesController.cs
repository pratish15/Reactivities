using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetActivities(CancellationToken ct)
        {
            var result =  await Mediator.Send(new List.Query(),ct);
            return HandleResult(result);            
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivities(Guid id)
        {
            var result = await Mediator.Send(new Details.Query{Id=id});
            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity) // using IActionResul instead of Action Result because we are not returnin and type
        {
           var result = await Mediator.Send(new Create.Command{Activity=activity});
           return HandleResult(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity) // using IActionResul instead of Action Result because we are not returnin and type
        {
           activity.Id =id;
           return HandleResult( await Mediator.Send(new Edit.Command{Activity=activity}));
        }

         [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id) // using IActionResul instead of Action Result because we are not returnin and type
        {

           return HandleResult( await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}