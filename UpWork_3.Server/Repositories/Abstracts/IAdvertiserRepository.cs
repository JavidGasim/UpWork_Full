using UpWork.Entities;

namespace UpWork.Repositories.Abstracts
{
    public interface IAdvertiserRepository
    {
        Task<List<Advertiser>> GetAllAdvertiser();
        Task<Advertiser> GetAdvertiserById(string id);
        Task AddAdvertiser(Advertiser advertiser);
        Task DeleteAdvertiser(Advertiser advertiser);
        Task UpdateAdvertiser(Advertiser advertiser);
    }
}
