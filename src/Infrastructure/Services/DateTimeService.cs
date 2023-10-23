using LLocate.Application.Common.Interfaces;

namespace LLocate.Infrastructure.Services;

public class DateTimeService : IDateTime
{
    public DateTime Now => DateTime.Now;
}
