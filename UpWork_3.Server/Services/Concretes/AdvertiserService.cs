using UpWork.Entities;
using UpWork.Repositories.Abstracts;
using UpWork.Services.Abstracts;

namespace UpWork.Services.Concretes
{
    public class AdvertiserService : IAdvertiserService
    {
        private readonly IAdvertiserRepository _advertiserRepository;

        public AdvertiserService(IAdvertiserRepository advertiserRepository)
        {
            _advertiserRepository = advertiserRepository;
        }

        public async Task AddAdvertiser(Advertiser advertiser)
        {
            await _advertiserRepository.AddAdvertiser(advertiser);
        }

        public async Task DeleteAdvertiser(Advertiser advertiser)
        {
            await _advertiserRepository.DeleteAdvertiser(advertiser);
        }

        public async Task<Advertiser> GetAdvertiserById(string id)
        {
            return await _advertiserRepository.GetAdvertiserById(id);
        }

        public async Task<List<Advertiser>> GetAllAdvertiser()
        {
            return await _advertiserRepository.GetAllAdvertiser();
        }

        public async Task UpdateAdvertiser(Advertiser advertiser)
        {
            await _advertiserRepository.UpdateAdvertiser(advertiser);
        }
    }
}
