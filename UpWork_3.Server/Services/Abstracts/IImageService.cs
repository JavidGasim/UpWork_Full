namespace UpWork.Services.Abstracts
{
    public interface IImageService
    {
        Task<string> SaveFile(IFormFile file);
    }
}
