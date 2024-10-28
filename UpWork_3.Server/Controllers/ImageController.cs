using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UpWork_3.Server.Services.Abstracts;

namespace UpWork_3.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IPhotoService _photoService;

        public ImageController(IPhotoService photoService)
        {
            _photoService = photoService;
        }

        [HttpPost("post")]
        public async Task<IActionResult> Post()
        {
            var file = Request.Form.Files.GetFile("File");

            if (file != null && file.Length > 0)
            {
                string result = await _photoService.UploadImageAsync(new Dtos.PhotoCreationDTO { File = file });

                return Ok(new { ImageUrl = result });
            }

            else
            {
                return BadRequest(new { Message = "Photo Creation Failed" });
            }
        }
    }
}
