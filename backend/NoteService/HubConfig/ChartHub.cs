using Microsoft.AspNetCore.SignalR;
using NoteService.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NoteService.HubConfig
{
    public class ChartHub: Hub
    {
        public async Task BroadcastChartData(List<ChartModel> data) => await Clients.All.SendAsync("broadcastchartdata", data);
    }
}
