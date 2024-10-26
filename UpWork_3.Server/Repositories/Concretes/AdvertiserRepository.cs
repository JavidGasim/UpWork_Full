using Microsoft.EntityFrameworkCore;
using UpWork.Data;
using UpWork.Entities;
using UpWork.Repositories.Abstracts;

namespace UpWork.Repositories.Concretes
{
    public class AdvertiserRepository : IAdvertiserRepository
    {
        private readonly UpWorkDb _context;

        public AdvertiserRepository(UpWorkDb context)
        {
            _context = context;
        }

        public async Task AddAdvertiser(Advertiser advertiser)
        {
            await _context.Advertisers.AddAsync(advertiser);
        }

        public async Task DeleteAdvertiser(Advertiser advertiser)
        {
            await Task.Run(async () =>
            {
                _context.Advertisers.Remove(advertiser);
            });

            await _context.SaveChangesAsync();
        }

        public async Task<Advertiser> GetAdvertiserById(string id)
        {
            return await _context.Advertisers.FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<List<Advertiser>> GetAllAdvertiser()
        {
            return await _context.Advertisers.ToListAsync();
        }

        public async Task UpdateAdvertiser(Advertiser advertiser)
        {
            await Task.Run(() =>
            {
                _context.Advertisers.Update(advertiser);
            });

            await _context.SaveChangesAsync();
        }
    }
}
