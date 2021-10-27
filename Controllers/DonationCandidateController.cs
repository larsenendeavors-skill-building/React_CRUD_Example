using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using React_Core_Demo.Data;
using React_Core_Demo.Models;

namespace React_Core_Demo_0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonationCandidateController : ControllerBase
    {
        private readonly DonationDbContext _context;

        public DonationCandidateController(DonationDbContext context)
        {
            _context = context;
        }

        // GET: api/DonationCandidate
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DonationCandidate>>> GetDonationCandidates()
        {
            return await _context.DonationCandidates.ToListAsync();
        }
        
        // GET: api/DonationCandidate/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<DonationCandidate>> GetDonationCandidate(int id)
        {
            var donationCandidate = await _context.DonationCandidates.FindAsync(id);

            if (donationCandidate == null)
            {
                return NotFound();
            }

            return donationCandidate;
        }
        
        // PUT: api/DonationCandidate/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id:int}")]
        public async Task<IActionResult> PutDonationCandidate(int id, DonationCandidate donationCandidate)
        {
            donationCandidate.Id = id;
            _context.Entry(donationCandidate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DCandidateExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        
        // POST: api/DonationCandidate
        [HttpPost]
        public async Task<ActionResult<DonationCandidate>> PostDonationCandidate(DonationCandidate donationCandidate)
        {
            _context.DonationCandidates.Add(donationCandidate);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDonationCandidate", new { id = donationCandidate.Id }, donationCandidate);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<DonationCandidate>> DeleteDonationCandidate(int id)
        {
            var donationCandidate = await _context.DonationCandidates.FindAsync(id);
            if (donationCandidate == null)
            {
                return NotFound();
            }

            _context.DonationCandidates.Remove(donationCandidate);
            await _context.SaveChangesAsync();

            return donationCandidate;
        }

        private bool DCandidateExists(int id)
        {
            return _context.DonationCandidates.Any(dc => dc.Id == id);
        }
    }
}