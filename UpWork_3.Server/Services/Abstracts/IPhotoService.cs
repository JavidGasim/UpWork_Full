using UpWork_3.Server.Dtos;

namespace UpWork_3.Server.Services.Abstracts
{
    public interface IPhotoService
    {
        Task<string> UploadImageAsync(PhotoCreationDTO dto);
    }
}
