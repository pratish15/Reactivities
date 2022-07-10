using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
         public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                 var activity = await _context.Activities.FindAsync(request.Id);
               
               if(activity!=null)
               {
                    _context.Activities.Remove(activity); // no need to use AddAsync becuase it is in memory not savechanges
               }
               
                await _context.SaveChangesAsync();

                return Unit.Value; // returns nothing - this just lets API controller tto know we have finished.
            }
        }
        
    }
}