using UpWork.Entities;

namespace UpWork.Services.Abstracts
{
    public interface IAdvertiserService
    {
        Task<List<Advertiser>> GetAllAdvertiser();
        Task<Advertiser> GetAdvertiserById(string id);
        Task AddAdvertiser(Advertiser advertiser);
        Task DeleteAdvertiser(Advertiser advertiser);
        Task UpdateAdvertiser(Advertiser advertiser);
    }
}
