using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivitiesController: BaseApiController
{
    
    [HttpGet] // api/activities
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await Mediator.Send(new List.Query());
    }
    
    [HttpGet]
    [Route("{id}")] // api/activities/{id}
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {
        return await Mediator.Send(new Detail.Query{Id = id});
    }
    
    [HttpPost] // api/activities/create
    public async Task<ActionResult> CreateActivity(Activity activity)
    {
        return Ok(await Mediator.Send(new Create.Command {Activity = activity}));
    }
    
    [HttpPut("{id}")] // api/activities/{id}
    public async Task<ActionResult> EditActivity(Guid id, Activity activity)
    {
        activity.Id = id;
        await Mediator.Send(new Edit.Command { Activity = activity });
        return Ok();
    }
    
    [HttpDelete("{id}")] // api/activities/{id}
    public async Task<ActionResult> DeleteActivity(Guid id)
    {
        await Mediator.Send(new Delete.Command { Id = id });
        return Ok();
    }
    
}