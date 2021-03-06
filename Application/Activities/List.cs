using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<Activity>>>{}
      
        public class Handler : IRequestHandler<Query, Result<List<Activity>>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;
            public Handler(DataContext context, ILogger<List> logger)
            {
                _logger = logger;
                _context = context;
            }

            public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // If A query takes ong and then user decides to cancel, he can close browser but that wil not cancel the requesty being processed in the background on the server.
                // to acheive this, we need to pass a cancelation token so that the request gets cancelled on the server.

                // try
                // {
                //     // // To simulate / Fake a cancellation request, below is used.
                //     // for(var i = 0; i<10; i++)
                //     // {
                //     //     cancellationToken.ThrowIfCancellationRequested();
                //     //     await Task.Delay(1000,cancellationToken);
                //     //     _logger.LogInformation($"Task {i} was cancelled");
                //     // }
                // }
                // catch(Exception ex) when (ex is TaskCanceledException)
                // {
                //     _logger.LogInformation($"Task was cancelled");
                // }

               var result =  await _context.Activities.ToListAsync(cancellationToken);
               return Result<List<Activity>>.Success(result);
            }
        }
    }
}