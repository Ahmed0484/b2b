
using API.DTOs;

namespace API.Services
{
    public class ImageService
    {
        private readonly IWebHostEnvironment _env;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ImageService(IWebHostEnvironment env, IHttpContextAccessor httpContextAccessor)
        {
            _env = env;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<LocalImageUploadResult> AddImageAsync(IFormFile file)
        {
            var result = new LocalImageUploadResult();

            if (file == null || file.Length == 0)
            {
                result.Error = "File is empty.";
                return result;
            }

            // 1. Get the wwwroot/uploads folder path
            var webRoot = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            var uploadsFolder = Path.Combine(webRoot, "uploads");

            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            // 2. Generate a unique filename (this acts as your PublicId)
            var uniqueFileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            // 3. Save the file locally
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // 4. Build the full URL for React
            var request = _httpContextAccessor.HttpContext!.Request;
            result.Url = $"{request.Scheme}://{request.Host}/uploads/{uniqueFileName}";
            result.PublicId = uniqueFileName;

            return result;
        }

        public Task<bool> DeleteImageAsync(string publicId)
        {
            if (string.IsNullOrEmpty(publicId))
                return Task.FromResult(false);

            var webRoot = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            var filePath = Path.Combine(webRoot, "uploads", publicId);

            if (File.Exists(filePath))
            {
                File.Delete(filePath);
                return Task.FromResult(true);
            }

            return Task.FromResult(false);
        }
    }

}