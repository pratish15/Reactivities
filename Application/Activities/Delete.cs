using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
         public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                 var activity = await _context.Activities.FindAsync(request.Id);
               
                //if(activity==null) return null;
              
                _context.Activities.Remove(activity); // no need to use AddAsync becuase it is in memory not savechanges
            
                var result = await _context.SaveChangesAsync() >0;

                if(!result) return Result<Unit>.Failure("Failed to delete the activity");

                return Result<Unit>.Success(Unit.Value); // Unit.Value returns nothing - this just lets API controller tto know we have finished.
            }
        }
        
    }
}